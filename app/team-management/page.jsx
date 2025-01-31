"use client"
import { withLayout, PageHeader,CustomTable } from "@/components"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const UserManagement = () => {
    const handleOpenModal = () => {
        alert("working over this")
    }
    return (
        <>
            <PageHeader
                text="Team Management"
                buttonText="Add Member"
                onButtonClick={handleOpenModal}
                icon={<PersonAddAltIcon height={20} width={20} />}
            />
            <CustomTable />
        </>)

}
export default withLayout(UserManagement);