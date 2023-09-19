import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string,
  title: string,
  template: string
}

interface PromptSelectProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PromptSelectProps){
  const [prompt, setPrompt] = useState<Prompt[] | null>(null)

  function handlePromptSelected(promptId: string){
    const selectedPrompt = prompt?.find(prompt => prompt.id === promptId)

    if(!selectedPrompt){
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  useEffect(() =>{
    api.get('/prompts').then(response => {
      setPrompt(response.data)
    })
  },[])

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..."/>
      </SelectTrigger>

      <SelectContent>
        {prompt?.map(prompt => {
          return(
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.title}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}