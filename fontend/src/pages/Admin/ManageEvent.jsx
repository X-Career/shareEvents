import React from 'react'
import { Button, Pagination, Popconfirm, Table, Typography, Input, Space, message } from "antd"
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"
import { BsFillTrashFill } from 'react-icons/bs'
import { getAllEvents, deleteEvent } from "../../services"
import { useEffect, useState, useRef } from "react"

const ManageEvent = () => {
  const [pageSize, setPageSize] = useState(3)
  const [pageIndex, setPageIndex] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [events, setEvents] = useState([])

  // Table
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const deleteEventById = async (id) => {
    try {
      console.log('Deleting event with ID:', id);
      const result = await deleteEvents(id);
      console.log('Delete event result:', result);
      setEvents(events.filter(event => event._id !== id));
      setTotalDocs(totalDocs - 1);
      message.success("Xoá event thành công!");
    } catch (error) {
      message.error("Xoá event thất bại!");
      console.log(error);
    }
  }
  const getData = async () => {
    try {
      const result = await getAllEvents(pageSize, pageIndex);
      console.log('Data from API:', result.data);
      setEvents(prevEvents => result.data.events.docs.map(event => ({
        ...event,
        categories: event.categories.name,
      })));
      setTotalDocs(result.data.events.totalDocs);
      setTotalPages(result.data.events.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  // Table: Search

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters);
              handleSearch(selectedKeys, confirm, dataIndex);
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        confirm({
                            closeDropdown: false,
                        });
                        setSearchText(selectedKeys[0]);
                        setSearchedColumn(dataIndex);
                    }}
                >
                    Filter
                </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const column = [
    {
      title: "EventName",
      dataIndex: "nameE",
      key: "nameE",
      width: '30%',
      ...getColumnSearchProps('nameE'),
    },
    {
      title: "StartingTime",
      dataIndex: "startingTime",
      key: "startingTime",
      width: '10%',
      ...getColumnSearchProps('startingTime'),
    },
    {
      title: "EndingTime",
      dataIndex: "endingTime",
      width: "30%",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: '30%',
      ...getColumnSearchProps('location'),
    },
    {
      title: "PaymentOfMethod",
      dataIndex: "paymentOfMethod",
      key: "paymentOfMethod",
      width: '30%',
      ...getColumnSearchProps('paymentOfMethod'),
    },
    {
      title: "Categories",
      dataIndex: "categories",
      key: "categories",
      width: '30%',
      ...getColumnSearchProps('categories'),
      render: (text, record) => (
        <span>
          {Array.isArray(record.categories) ? record.categories.map(category => category.name).join(', ') : record.categories}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: '30%',
      ...getColumnSearchProps('status'),
    },
    {
      title: "Action",
      render: (_, record) => {
        return <><Link to={`/admin/profile/${record?._id}`}><AiOutlineEdit /></Link>
          <Popconfirm title={"Bạn có muốn xoá User này không!"} onConfirm={() => deleteEventById(record?._id)}><BsFillTrashFill /></Popconfirm>
        </>
      }
    }
  ]

  useEffect(() => {
    getData();
  }, [pageSize, pageIndex])
  return (
    <div>
      <Typography.Title level={3}>Events Management</Typography.Title>
      <Table
        style={{ marginTop: '10px' }}
        dataSource={events}
        columns={column}
        pagination={false}
      ></Table>
      <Pagination
        style={{ marginTop: '10px' }}
        pageSize={pageSize}
        total={totalDocs}
        current={pageIndex}
        onChange={(pageIndex, pageSize) => {
          setPageIndex(pageIndex);
          setPageSize(pageSize);
        }}
        showSizeChanger
        showTotal={(total) => <Typography.Text strong={true}>Total: {total} Users</Typography.Text>}
      />
    </div>
  )

}

export default ManageEvent