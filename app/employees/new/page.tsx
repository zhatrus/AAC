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

interface SalaryGrade {
  id: number
  category: string
  position_uk: string
}

export default function NewEmployee() {
  const router = useRouter()
  const [employee, setEmployee] = useState({
    full_name: "",
    email: "",
    phone: "",
    location: "",
    project_id: "",
    salary_grade_id: "",
  })
  const [projects, setProjects] = useState<Project[]>([])
  const [salaryGrades, setSalaryGrades] = useState<SalaryGrade[]>([])

  useEffect(() => {
    // Fetch projects
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err))

    // Fetch salary grades
    fetch("/api/salary-grades")
      .then((res) => res.json())
      .then((data) => setSalaryGrades(data))
      .catch((err) => console.error("Error fetching salary grades:", err))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      })
      if (res.ok) {
        router.push("/employees")
      } else {
        console.error("Failed to create employee")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Додати нового працівника</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="full_name">ПІБ</Label>
          <Input id="full_name" name="full_name" value={employee.full_name} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={employee.email} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" name="phone" value={employee.phone} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="location">Локація</Label>
          <Input id="location" name="location" value={employee.location} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="project_id">Проект</Label>
          <Select id="project_id" name="project_id" value={employee.project_id} onChange={handleChange} required>
            <option value="">Виберіть проект</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.project_title}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="salary_grade_id">Грейд зарплати</Label>
          <Select
            id="salary_grade_id"
            name="salary_grade_id"
            value={employee.salary_grade_id}
            onChange={handleChange}
            required
          >
            <option value="">Виберіть грейд зарплати</option>
            {salaryGrades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.category} - {grade.position_uk}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit">Додати працівника</Button>
      </form>
    </div>
  )
}

