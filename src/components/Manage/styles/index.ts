import styled from "styled-components";
import { Table, TableProps } from "antd";
import { DataType } from "../TaxiTable";

export const StyledTable = styled(Table)<TableProps<DataType>>`
  .ant-table {
    margin-inline: 100px;
  }
    thead.ant-table-thead > tr > th {
      padding: 16px 16px;
    }
    tbody.ant-table-tbody > tr > td {
      padding: 16px 16px;
    }

  @media (max-width: 768px) {
    .ant-table {
      margin: 1px;
    }
    thead.ant-table-thead > tr > th {
      padding: 4px 4px;
    }
    tbody.ant-table-tbody > tr > td {
      padding: 4px 4px;
    }
  }
`;
