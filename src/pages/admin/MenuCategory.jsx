import React from 'react';
import Breadcrumb from '../../components/client/Breadcrumb';
import { getBreadcrumbs } from '../../lib/staticData';

const MenuCategory = () => {
    return (
        <div>
            <Breadcrumb breadcrumbs={getBreadcrumbs(0,3, [
                            { name: "Data Management", link: "" },
                            { name: "Menu Category", link: "/data-management/menu-category" }
                        ])} />
        </div>
    );
};

export default MenuCategory;