"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

interface AccessRequest {
  id: number
  user_id: number
  user_name: string
  tool_id: number
  tool_name: string
  access_level: string
  reason: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export default function AccessRequests() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [requests, setRequests] = useState<AccessRequest[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const page = Number(searchParams.get("page")) || 1
  const pageSize = 10

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`/api/access-requests?page=${page}&pageSize=${pageSize}`)
        if (res.ok) {
          const data = await res.json()
          setRequests(data.requests)
          setTotalPages(data.totalPages)
        } else {
          console.error("Failed to fetch access requests")
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }

    fetchRequests()
  }, [page])

  const handleStatusChange = async (id: number, newStatus: "approved" | "rejected") => {
    try {
      const res = await fetch(`/api/access-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        setRequests(requests.map((req) => (req.id === id ? { ...req, status: newStatus } : req)))
      } else {
        console.error("Failed to update access request status")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handlePageChange = (newPage: number) => {
    router.push(`/access-requests?page=${newPage}`)
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Запити на доступ</h1>
        <Link href="/access-requests/new">
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" /> Новий запит
          </Button>
        </Link>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Користувач
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Інструмент
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Рівень доступу
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{request.user_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{request.tool_name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{request.access_level}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : request.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(request.id, "approved")}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Схвалити
                      </button>
                      <button
                        onClick={() => handleStatusChange(request.id, "rejected")}
                        className="text-red-600 hover:text-red-900"
                      >
                        Відхилити
                      </button>
                    </>
                  )}
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

