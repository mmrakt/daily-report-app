import React from 'react'
import { cleanup } from '@testing-library/react'
import DrawerItem from '../layout/header/drawerItem'
import Drawer from '../layout/header/drawer'
import MenuList from '../layout/header/menuList'
import renderer from 'react-test-renderer'
import MenuIcon from '@material-ui/icons/Menu'

afterEach(cleanup)

// describe('Header', () => {
//     const component = renderer.create(<Header />)
//     const tree = component.toJSON()

//     expect(tree).toMatchSnapshot()
// })

test('DrawerItem', () => {
    const component = renderer.create(
        <DrawerItem
            href="/"
            icon={<MenuIcon />}
            listItemText="トップメニュー"
        />
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('Drawer', () => {
    const component = renderer.create(
        <Drawer isOpenDrawer={false} handleClose={jest.fn()} />
    )
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})

test('MenuList', () => {
    const component = renderer.create(<MenuList />)
    const tree = component.toJSON()

    expect(tree).toMatchSnapshot()
})
