import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallById = (id: string | string[]) => {
    const [call, setCall] = useState<Call>();
    const [isCallLoading, setIsCallLoading] = useState(true);
    const client = useStreamVideoClient();
    useEffect(() => {
        if (!client) return;
        // Here a function is created and called just after that because we are making an async funcion inside useEffect
        // So to prevent the code from breaking when the dependecies change and to excute the useEffect the function is called 
        // right after the function body
        const loadCall = async () => {
            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id
                }
            })
            //Filtering out the call using queryCalls function
            if (calls.length > 0) setCall(calls[0]);
            setIsCallLoading(false);
        }
        loadCall();
    }, [client, id]);
    // returning the call and the laoding state back to meeting page.
    return { call, isCallLoading };
}