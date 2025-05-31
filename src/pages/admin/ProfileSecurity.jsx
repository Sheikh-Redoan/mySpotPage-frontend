import React from 'react';
import Breadcrumb from '../../components/client/Breadcrumb';
import { getBreadcrumbs } from '../../lib/staticData';

const ProfileSecurity = () => {
    return (
        <div className='h-full'>
            <Breadcrumb breadcrumbs={getBreadcrumbs(0, 3, [
                { name: "My Profile", link: "" },
                { name: "Security", link: "/profile-management/my-profile/security" }
            ])} />
            <div className="bg-white h-[94%] rounded-xl p-4 font-golos">

            </div>
        </div>
    );
};

export default ProfileSecurity;