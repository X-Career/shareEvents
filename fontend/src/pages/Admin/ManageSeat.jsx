import React from 'react'
import { Button, Pagination, Popconfirm, Table, Typography, Input, Space, message } from "antd"
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom"
import { AiOutlineEdit } from "react-icons/ai"
import { BsFillTrashFill } from 'react-icons/bs'
import { getAllseat, deleteSeat } from "../../services"
import { useEffect, useState, useRef } from "react"
const ManageSeat = () => {

  const [pageSize, setPageSize] = useState(3)
  const [pageIndex, setPageIndex] = useState(1)
  const [count, setCount] = useState(0)
  const [totalPage, setTotalPage] = useState(0)
  const [seat, setSeat] = useState([])

  // Table
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const deleteSeatById = async (id) => {
    try {
      const result = await deleteSeat(id);
      console.log("deleteResult:", result); // In ra để kiểm tra kết quả từ server
      if (result.data.success) {
        setSeat(seat.filter(seats => seats._id !== id));
        setCount(count - 1);
        message.success("Xoá Ghế thành công!");
      } else {
        message.error("Xoá Ghế thất bại!");
      }
    } catch (error) {
      message.error("Xoá Ghế thất bại!");
      console.error(error);
    }
  }

  const getData = async () => {
    try {
      const result = await getAllseat(pageSize, pageIndex)
      console.log('res', result);
      setSeat(result.data.result.dataSeats)
      console.log('Seat', result.data.result.dataSeats)
      setCount(result.data?.result?.count)
      setTotalPage(result.data?.result?.totalPage)
      // console.log(result)
    } catch (error) {
      console.log(error)
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
      title: "NameSeat",
      dataIndex: "nameOfSeat",
      key: "nameOfSeat",
      width: '30%',
      ...getColumnSearchProps('nameOfSeat'),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: '10%',
      ...getColumnSearchProps('type'),
    },
    // {
    //   title: "Events",
    //   dataIndex: "events",
    //   key: "events",
    //   width: '30%',
    //   ...getColumnSearchProps('events'),
    // },
    {
      title: "Action",
      render: (_, record) => {
        return <><Link to={`/admin/profile/${record?._id}`}><AiOutlineEdit /></Link>
          <Popconfirm title={"Bạn có muốn xoá User này không!"} onConfirm={() => deleteSeatById(record?._id)}><BsFillTrashFill /></Popconfirm>
        </>
      }
    }
  ]

  useEffect(() => {
    getData();
  }, [pageSize, pageIndex])

  return (
    <div>
      <Typography.Title level={3}>User Management</Typography.Title>
      <Table
        style={{ marginTop: '10px' }}
        dataSource={seat}
        columns={column}
        pagination={false}
        rowKey={(record) => record._id}
      />
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
        showTotal={(total) => <Typography.Text strong={true}>Total: {total} Seats</Typography.Text>}
      />
    </div>
  )
}

export default ManageSeat