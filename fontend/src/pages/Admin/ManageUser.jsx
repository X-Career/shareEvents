import React from 'react'
import { Button, Pagination, Popconfirm, Table, Typography } from "antd"
import { Link } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"
import { BsFillTrashFill } from 'react-icons/bs'
import { getAllUser } from "../../services"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"

const ManageUser = () => {
    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [count, setCount] = useState(0)
    const [totalPage, setTotalPage] = useState(0)
    const [users, setUsers] = useState([])

    const column = [
        {
            title: "Fullname",
            dataIndex: "fullName"
        },
        {
            title: "Gender",
            dataIndex: "gender",
        },
        {
            title: "Date of Birth",
            dataIndex: "dateOfBirth",
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "PhoneNumber",
            dataIndex: "phoneNumber"
        },
        {
            title: "Username",
            dataIndex: "userName"
        },
        {
            title: "Status",
            dataIndex: "status"
        },
        {
            title: "Role",
            dataIndex: "role"
        },
        {
            title: "Action",
            render: (_, record) => {
                return <><Link to={`/add-product/${record?._id}`}><AiOutlineEdit /></Link><Popconfirm title={"Bạn có muốn xoá User này không!"} onConfirm={() => deleteProductById(record?._id)}><BsFillTrashFill /></Popconfirm></>
            }
        }
    ]

    const getData = async () => {
        try {
            const result = await getAllUser(pageSize, pageIndex)
            setUsers(result.data?.result?.users)
            setCount(result.data?.result?.count)
            setTotalPage(result.data?.result?.totalPage)
            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    


    useEffect(() => {
        getData()
    }, [pageSize, pageIndex])

    return (
        <div>
            <Typography.Title level={3}>User Management</Typography.Title>
            <Table
                style={{ marginTop: '10px' }}
                dataSource={users}
                columns={column}
                pagination={false}
            ></Table>
            <Pagination
                style={{ marginTop: '10px' }}
                pageSize={pageSize}
                total={count}
                current={pageIndex}
                onChange={(pageIndex, pageSize) => {
                    setPageIndex(pageIndex)
                    setPageSize(pageSize)
                }}
                showSizeChanger
                showTotal={(total) => <p>Total: {total} Users</p>}
            />
        </div>
    )
}

export default ManageUser