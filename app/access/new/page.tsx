"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"

interface Project {
  id: number
  project_title: string
}

interface Tool {
  id: number
  type: string
}

export default function NewAccess() {
  const router = useRouter()
  const [access, setAccess] = useState({
    project_id: "",
    tool_id: "",
    access_level: "",
    access_grant_date: "",
  })
  const [projects, setProjects] = useState<Project[]>([])
  const [tools, setTools] = useState<Tool[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/api/projects")
      const data = await res.json()
      setProjects(data)
    }

    const fetchTools = async () => {
      const res = await fetch("/api/tools")
      const data = await res.json()
      setTools(data)
    }

    fetchProjects()
    fetchTools()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAccess({ ...access, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(access),
      })
      if (res.ok) {
        router.push("/access")
      } else {
        console.error("Failed to create access")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Додати новий доступ</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="project_id">Проект</Label>
          <Select id="project_id" name="project_id" value={access.project_id} onChange={handleChange} required>
            <option value="">Виберіть проект</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_title}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="tool_id">Інструмент</Label>
          <Select id="tool_id" name="tool_id" value={access.tool_id} onChange={handleChange} required>
            <option value="">Виберіть інструмент</option>
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.type}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="access_level">Рівень доступу</Label>
          <Input id="access_level" name="access_level" value={access.access_level} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="access_grant_date">Дата надання доступу</Label>
          <Input
            id="access_grant_date"
            name="access_grant_date"
            type="date"
            value={access.access_grant_date}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit">Додати доступ</Button>
      </form>
    </div>
  )
}

