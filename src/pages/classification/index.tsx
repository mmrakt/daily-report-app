import React from 'react'
import Layout from '../../components/layout/index'
import {
    CategoriesBlock,
    ProjectsBlock,
    RolesBlock,
} from '@/components/classification/Block'

const ClassificationPage: React.VFC = () => {
    return (
        <Layout>
            <div className="class">
                <RolesBlock />
                <div className="mt-5"></div>
                <CategoriesBlock />
                <div className="mt-5"></div>
                <ProjectsBlock />
            </div>
        </Layout>
    )
}

export default ClassificationPage