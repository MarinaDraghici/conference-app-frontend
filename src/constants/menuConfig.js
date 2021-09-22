import React from 'react'
import Dashboard from '@material-ui/icons/Dashboard'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"


const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome', roles: [], rights: [] },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu', roles: [], rights: [] },
  {
    icon: <Settings />,
    text: 'NavBar.Settings',
    path: '/settings',
    name: 'Settings',
    roles: [],
    rights: []
  }
]

export default menuItems
