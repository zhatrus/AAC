"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewTool() {
  const router = useRouter()
  const [tool, setTool] = useState({
    type: "",
    main_account: "",
    url: "",
    owner: "",
    related_projects: "",
    standard_access: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTool({ ...tool, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tool),
      })
      if (res.ok) {
        router.push("/tools")
      } else {
        console.error("Failed to create tool")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Додати новий інструмент</h1>
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
        <Button type="submit">Додати інструмент</Button>
      </form>
    </div>
  )
}

