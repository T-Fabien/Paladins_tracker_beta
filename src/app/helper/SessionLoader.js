import { useEffect } from "react";

//API
import { ping } from "@/api/ping";
import { createSession } from "@/api/createSession";
import { testSession } from "@/api/testSession";
import { getChampions } from "@/api/getChampions";

// Zustand
import { useStoreChampion, useStoreSession } from "../store";
 
// React Query
import { useQuery } from "@tanstack/react-query";

const SessionLoader = () => {

  // Zustand
  const setSessionId = useStoreSession((state) => state.setSessionId);
  const sessionId = useStoreSession((state) => state.sessionId);

  const setChampionList = useStoreChampion((state) => state.setChampionList);
  const championList = useStoreChampion((state) => state.championList);


  const { data: sessionData } = useQuery({
    queryKey: ['session'],
    queryFn: () => createSession(),
    enabled: sessionId === '' ,
    onError: (error) => {
      console.error('Erreur de récupération de la session: ', error);
    },
  })

var id = "";
  if (sessionData) {
    id = sessionData.session_id;
  }

  const { data:championsData} = useQuery({
    queryKey: ['champions'],
    queryFn: () => getChampions(id),
    enabled: id != "" && championList == null,
    onError: (error) => {
      console.error('Erreur de récupération des champions : ', error);
    },
  })

  useEffect(() => {
    if (sessionData) {
      setSessionId(sessionData.session_id)
    }
    if (championsData) {
      setChampionList(championsData)
    }
  }, [championsData])

};

export default SessionLoader;
