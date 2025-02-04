"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface Access {
  id: number
  project_id: number
  project_name: string
  tool_id: number
  tool_name: string
  access_level: string
  access_grant_date: string
  access_revocation_date: string | null
}

export default function Access() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [accesses, setAccesses] = useState<Access[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const page = Number(searchParams.get("page")) || 1
  const pageSize = 10

  useEffect(() => {
    const fetchAccesses = async () => {
      try {
        const res = await fetch(`/api/access?page=${page}&pageSize=${pageSize}`)
        if (res.ok) {
          const data = await res.json()
          setAccesses(data.accesses)
          setTotalPages(data.totalPages)
        } else {
          console.error("Failed to fetch accesses")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchAccesses()
  }, [page])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/access/${id}`, { method: "DELETE" })
      if (res.ok) {
        setAccesses(accesses.filter((access) => access.id !== id))
      } else {
        console.error("Failed to delete access")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handlePageChange = (newPage: number) => {
    router.push(`/access?page=${newPage}`)
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Управління доступами</h1>
        <Link href="/access/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Додати доступ
          </Button>
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Проект</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Інструмент
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Рівень доступу
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата надання
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accesses.map((access) => (
              <tr key={access.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{access.project_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{access.tool_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{access.access_level}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{new Date(access.access_grant_date).toLocaleDateString()}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/access/${access.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Редагувати
                  </Link>
                  <button onClick={() => handleDelete(access.id)} className="text-red-600 hover:text-red-900">
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between">
        <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Попередня
        </Button>
        <span>
          Сторінка {page} з {totalPages}
        </span>
        <Button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Наступна
        </Button>
      </div>
    </div>
  )
}

