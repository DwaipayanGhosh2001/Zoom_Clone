import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    //This state will hold all the calls of a client
    const [calls, setCalls] = useState<Call[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    // the calls will come from the video client
    const client = useStreamVideoClient();
    //The user will be needed to get the calls of a specific user
    const {user} = useUser();

    useEffect(()=> {
        //The fetching of the calls is asynchronous so we need to wait and call the function after the async function
        const loadCalls = async () => {
            if(!client || !user?.id) return;

        setIsLoading(true);
        try {
            // https://getstream.io/video/docs/react/guides/querying-calls/#filters
            const { calls } = await client.queryCalls({
              sort: [{ field: 'starts_at', direction: -1 }],
              filter_conditions: {
                starts_at: { $exists: true },
                $or: [
                  { created_by_user_id: user.id },
                  { members: { $in: [user.id] } },
                ],
              },
            });
    
            setCalls(calls);
          }catch (error) {
                console.log(error);
            }
            finally{
                setIsLoading(false);
            }
        }
        loadCalls();
    }, [client, user?.id])

    const now = new Date();
// //Filtering out the calls that have ended. Meaning calls that have startAt less then the current time
// const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
//     return (startsAt && new Date(startsAt) < now) || !!endedAt
//   })
//     //Filtering out the calls that are upcoming. Meaning calls that have startAt more then the current time
//     const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
//         return startsAt && new Date(startsAt) > now
//       })
const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt
  })

  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now
  })
    return{
        endedCalls,
        upcomingCalls,
        callRecordings: calls,
        isLoading
    }
}