"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface Employee {
  id: number
  full_name: string
  position: string
  project_id: number
}

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/employees/${id}`, { method: "DELETE" })
      if (res.ok) {
        setEmployees(employees.filter((employee) => employee.id !== id))
      } else {
        console.error("Failed to delete employee")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("/api/employees")
        if (res.ok) {
          const data = await res.json()
          setEmployees(data)
        } else {
          console.error("Failed to fetch employees")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchEmployees()
  }, [])

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Управління персоналом</h1>
        <Link href="/employees/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Додати працівника
          </Button>
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ПІБ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Посада</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Проект</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{employee.full_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.position}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{employee.project_id}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/employees/${employee.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Редагувати
                  </Link>
                  <button onClick={() => handleDelete(employee.id)} className="text-red-600 hover:text-red-900">
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

