"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface Tool {
  id: number
  type: string
  main_account: string
  url: string
  owner: string
}

export default function Tools() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tools, setTools] = useState<Tool[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const page = Number(searchParams.get("page")) || 1
  const pageSize = 10

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch(`/api/tools?page=${page}&pageSize=${pageSize}`)
        if (res.ok) {
          const data = await res.json()
          setTools(data.tools)
          setTotalPages(data.totalPages)
        } else {
          console.error("Failed to fetch tools")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchTools()
  }, [page])

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/tools/${id}`, { method: "DELETE" })
      if (res.ok) {
        setTools(tools.filter((tool) => tool.id !== id))
      } else {
        console.error("Failed to delete tool")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handlePageChange = (newPage: number) => {
    router.push(`/tools?page=${newPage}`)
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Управління інструментами</h1>
        <Link href="/tools/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Додати інструмент
          </Button>
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Головний акаунт
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Власник
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tools.map((tool) => (
              <tr key={tool.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{tool.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{tool.main_account}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{tool.url}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{tool.owner}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link href={`/tools/${tool.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    Редагувати
                  </Link>
                  <button onClick={() => handleDelete(tool.id)} className="text-red-600 hover:text-red-900">
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

