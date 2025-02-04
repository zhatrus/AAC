"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Tool {
  id: number
  type: string
  main_account: string
  url: string
  owner: string
  related_projects: string
  standard_access: string
}

export default function EditTool({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [tool, setTool] = useState<Tool | null>(null)

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const res = await fetch(`/api/tools/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setTool(data)
        } else {
          console.error("Failed to fetch tool")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchTool()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (tool) {
      setTool({ ...tool, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!tool) return

    try {
      const res = await fetch(`/api/tools/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tool),
      })
      if (res.ok) {
        router.push("/tools")
      } else {
        console.error("Failed to update tool")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  if (!tool) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Редагувати інструмент</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="type">Тип інструменту</Label>
          <Input id="type" name="type" value={tool.type} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="main_account">Головний акаунт</Label>
          <Input id="main_account" name="main_account" value={tool.main_account} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="url">URL</Label>
          <Input id="url" name="url" type="url" value={tool.url} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="owner">Власник</Label>
          <Input id="owner" name="owner" value={tool.owner} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="related_projects">Пов'язані проекти</Label>
          <Textarea
            id="related_projects"
            name="related_projects"
            value={tool.related_projects}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="standard_access">Стандартний доступ</Label>
          <Textarea id="standard_access" name="standard_access" value={tool.standard_access} onChange={handleChange} />
        </div>
        <Button type="submit">Оновити інструмент</Button>
      </form>
    </div>
  )
}

