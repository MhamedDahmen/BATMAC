import React from 'react'
import {MenuOutlined} from '@ant-design/icons'


export const SidebarData = [
    {
        title: "Utlisateurs",
        icon:  <MenuOutlined />    ,
        link: "/users"
    },
    {
        title: "Domaines",
        icon:  <MenuOutlined />    ,
        link: "/backdomaines"
    },
    {
        title: "Secteurs",
        icon:   <MenuOutlined />   ,
        link: "/backsecteur"
    },
    {
        title: "competence",
        icon: <MenuOutlined />  ,
        link: "/competences"
    },

    {
        title: "Tests",
        icon:      <MenuOutlined />   ,
        link: "/allTests"
    },

    {
        title: "Questions",
        icon:   <MenuOutlined />   ,
        link: "/backquestions"
    },
    {
        title: "Choices",
        icon:  <MenuOutlined />   ,
        link: "/backchoices"
    }

]




