import React from 'react'
import PropTypes from 'prop-types'
import Header from '../../components/header/index'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        },
        toolbar: theme.mixins.toolbar,
        pageTitle: {
            marginBottom: theme.spacing(3),
            textAlign: 'center',
        },
    })
)
type LayoutProps = {
    children: React.ReactNode
    title: string
}

const Layout = (props: LayoutProps): React.ReactElement => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Header />
            <main className="max-w-screen-md mx-auto my-20">
                <div>
                    <Typography
                        component="h2"
                        variant="h5"
                        color="inherit"
                        noWrap
                        className={classes.pageTitle}
                    >
                        {props.title}
                    </Typography>
                    {props.children}
                </div>
            </main>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
}

export default Layout
