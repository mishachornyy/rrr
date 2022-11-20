import React, { Fragment } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, FormGroup } from 'reactstrap';
import { Filter, DefaultColumnFilter } from './filters';
import left from "./last_left.png"
import  one_left from "./one page_left.png"
import  one_right from "./one page_right.png"
import  right from "./last_right.png"

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },

    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (

       <>
      <div className=" apptt  ml-[2.083vw]  mr-[2.083vw]">
        <insaid className="max-w-[300px] bg-white" >



        <thead  >
          {headerGroups.map((headerGroup) => (
            <tr  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className=""  {...column.getHeaderProps()  }
                >
                  <div className="head-text " {...column.getSortByToggleProps()} >
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>

                  <Filter  column={column}  />

                </th>
              ))}
            </tr>
          ))}

        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td className="h-[2.083vw] table-text " {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>

                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>

                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
        </insaid>

      </div>

    <div className="w-auto pt-[32px] pl-[38px]">
      <Row className="apptt flex">
        <Col md={3}>

          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            <img src={left} alt="left "/>
          </Button>
          <Button className="pl-[8px]"
              color='primary'
              onClick={previousPage}
              disabled={!canPreviousPage}
          >
            <img src={one_left} alt="one_left "/>
          </Button>

        </Col>
        <Col className="pl-[16px]"  md={2}>
          <Input className="number pl-[8px]"
              type='number'
              min={1}

              max={pageOptions.length}
              defaultValue={pageIndex + 1}
              onChange={onChangeInInput}
          />
        </Col>
        <Col md={2} className="pt-[4px]">

          <strong className="text pl-[6px] pr-[16px]">
            / {pageOptions.length}
          </strong>
        </Col>



        <Col md={3}>
          <Button className="pr-[8px]" color='primary' onClick={nextPage} disabled={!canNextPage}>
            <img src={one_right} alt="one_right "/>
          </Button>
          <Button className="pr-[16px]"
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            <img src={right} alt="right "/>
          </Button>

        </Col>
        <Col md={2}>
          <Input className="number pl-[8px]  pr-[16px]"

              type="select"
              value={pageSize}
              onChange={onChangeInSelect}
          >
            >
            {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                   {pageSize}
                </option>
            ))}
          </Input>
        </Col>
        <p className="text pt-[6px] pl-[12px]">items per page</p>

        <strong className="fff">
          {pageIndex + 1}
        </strong>
        <p key={pageSize} value={pageSize}>
          {pageSize}
        </p>
        <strong>
          of {pageOptions.length}
        </strong>
         
      </Row>
  </div>


       </>
  );
};

export default TableContainer;
