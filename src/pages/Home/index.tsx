import React, { useEffect, useState } from "react"
import { db } from "../../config/firebase"
import { Container, Title } from "./styles"
import { Button, TextInput, LogBox } from "react-native"

interface IStuffs {
  id: string
  title: string
}

export function Home() {
  LogBox.ignoreLogs(["Setting a timer for a long period of time"])

  const [stuffs, setStuffs] = useState<IStuffs[]>([])
  const [stuff, setStuff] = useState("")

  useEffect(() => {
    db.collection("stuffs").onSnapshot((query) => {
      const list: any[] = []
      query.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id })
      })

      setStuffs(list)
    })
  }, [])

  function collectStuff() {
    db.collection("stuffs").add({
      title: stuff
    })
  }

  function deleteStuff(id: any){
    db.collection('stuffs').doc(id).delete()
  }

  return (
    <Container>
      {stuffs.map((stuff) => {
        return <Title key={stuff.id} onPress={() => deleteStuff(stuff.id)} >{stuff.title}</Title>
      })}
      <TextInput placeholder="Stuff" value={stuff} onChangeText={setStuff} />
      <Button title="Collect" onPress={collectStuff} />
    </Container>
  )
}
