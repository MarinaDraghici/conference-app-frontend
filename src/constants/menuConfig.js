import React from 'react'
import Dashboard from '@material-ui/icons/Dashboard'
import Settings from '@material-ui/icons/Settings'
import HomeIcon from "@material-ui/icons/Home"
import EventIcon from '@material-ui/icons/Event'
import { EventNote } from '@material-ui/icons'


const menuItems = [
  { icon: <HomeIcon />, text: 'NavBar.Welcome', path: '/welcome', name: 'Welcome', roles: [], rights: [] },
  { icon: <HomeIcon />, text: 'NavBar.MyFirstMenu', path: '/helloWorld', name: 'MyFirstMenu', roles: [], rights: [] },
  { icon: <EventIcon />, text: 'NavBar.Conferences', path: '/conferences', name: 'Conferences', roles: [], rights: [] },
  { icon: <EventNote />, text: 'NavBar.MyConferences', path: '/myConferences', name: 'MyConferences', roles: [], rights: [] },
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
