"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Tool {
  id: number
  type: string
}

export default function NewAccessRequest() {
  const router = useRouter()
  const [tools, setTools] = useState<Tool[]>([])
  const [request, setRequest] = useState({
    tool_id: "",
    access_level: "",
    reason: "",
  })

  useEffect(() => {
    const fetchTools = async () => {
      const res = await fetch("/api/tools")
      const data = await res.json()
      setTools(data)
    }
    fetchTools()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } },
  ) => {
    setRequest({ ...request, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/access-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      })
      if (res.ok) {
        router.push("/access-requests")
      } else {
        console.error("Failed to create access request")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Подати запит на доступ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="tool_id">Інструмент</Label>
          <Select name="tool_id" onValueChange={(value) => handleChange({ target: { name: "tool_id", value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Виберіть інструмент" />
            </SelectTrigger>
            <SelectContent>
              {tools.map((tool) => (
                <SelectItem key={tool.id} value={tool.id.toString()}>
                  {tool.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="access_level">Рівень доступу</Label>
          <Input id="access_level" name="access_level" value={request.access_level} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="reason">Причина запиту</Label>
          <Textarea id="reason" name="reason" value={request.reason} onChange={handleChange} required />
        </div>
        <Button type="submit">Подати запит</Button>
      </form>
    </div>
  )
}

