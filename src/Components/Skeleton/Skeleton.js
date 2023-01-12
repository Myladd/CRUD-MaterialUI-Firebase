import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

export default function SkeletonTable() {
    const num = [1,2,3,4,5];
    return (
        <>
        {num.map((index) => (
                <TableRow key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                        <Skeleton variant="rounded" animation="wave" width={100} height={40} />
                    </TableCell>
                    <TableCell align="center"><Skeleton variant="rounded" animation="wave" width={100} height={40} /></TableCell>
                    <TableCell align="center"><Skeleton variant="rounded" animation="wave" width={100} height={40} /></TableCell>
                    <TableCell align="center"><Skeleton variant="rounded" animation="wave" width={100} height={40} /></TableCell>
                    <TableCell align="center"><Skeleton variant="rounded" animation="wave" width={100} height={40} /></TableCell>
                    <TableCell align="center"><Skeleton variant="rounded" animation="wave" width={100} height={40} /></TableCell>
                    <TableCell align="right">
                        <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                            <Skeleton variant="rounded" animation="wave" width={100} height={40} />
                            <Skeleton variant="rounded" animation="wave" width={100} height={40} />
                        </Stack>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}