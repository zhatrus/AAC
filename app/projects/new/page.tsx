"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function NewProject() {
  const router = useRouter()
  const [project, setProject] = useState({
    project_type: "",
    finance_number: "",
    activity_info: false,
    in_global_budget: false,
    project_support: "",
    back_donor_short: "",
    back_donor_long: "",
    ci_partner: "",
    funding_type: "",
    project_title: "",
    status: "",
    agreement_start_date: "",
    agreement_end_date: "",
    budget_euros: 0,
    spent: 0,
    balance_euro: 0,
    spent_percent: 0,
    sectors: "",
    ir: 0,
    modality: "",
    implementing_offices: "",
    location_oblasts: "",
    key_activities: "",
    target_group: "",
    beneficiaries_ind: "",
    assigned_accountant: "",
    assigned_pm: "",
    department_head_dm: "",
    project_key: "",
    name_short: "",
    localcode: "",
    programs: "",
    lead_program: "",
    погоджено_з_Програмним_директором: false,
    погоджено_з_Юридичним_директором: false,
    url_docs: "",
    url_review: "",
    status_review_percent_feell: 0,
    score_review: 0,
    sort: 0,
    local: false,
    baobab: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setProject((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      })
      if (res.ok) {
        router.push("/projects")
      } else {
        console.error("Failed to create project")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Додати новий проект</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="project_title">Назва проекту</Label>
          <Input
            id="project_title"
            name="project_title"
            value={project.project_title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="project_type">Тип проекту</Label>
          <Input id="project_type" name="project_type" value={project.project_type} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="status">Статус</Label>
          <Input id="status" name="status" value={project.status} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="agreement_start_date">Дата початку</Label>
          <Input
            id="agreement_start_date"
            name="agreement_start_date"
            type="date"
            value={project.agreement_start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="agreement_end_date">Дата завершення</Label>
          <Input
            id="agreement_end_date"
            name="agreement_end_date"
            type="date"
            value={project.agreement_end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="budget_euros">Бюджет (євро)</Label>
          <Input
            id="budget_euros"
            name="budget_euros"
            type="number"
            value={project.budget_euros}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="activity_info"
            name="activity_info"
            checked={project.activity_info}
            onCheckedChange={(checked) => setProject((prev) => ({ ...prev, activity_info: checked }))}
          />
          <Label htmlFor="activity_info">Activity Info</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in_global_budget"
            name="in_global_budget"
            checked={project.in_global_budget}
            onCheckedChange={(checked) => setProject((prev) => ({ ...prev, in_global_budget: checked }))}
          />
          <Label htmlFor="in_global_budget">В глобальному бюджеті</Label>
        </div>
        {/* Add more fields as needed */}
        <Button type="submit">Додати проект</Button>
      </form>
    </div>
  )
}

