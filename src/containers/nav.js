import React, { Component } from 'react'
import { FlatButton } from 'material-ui'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { List, ListItem } from 'material-ui/List'
import FontIcon from 'material-ui/FontIcon'
import { yellow600, grey600, blue300, blue700, white } from 'material-ui/styles/colors';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../actions'
import { style } from '../style'

class Nav extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}

	render() {
		const { history, match, logout } = this.props
		const { path } = match
		const user_data = JSON.parse(localStorage.getItem('user'))

		const drawer_contents = [
			<img style={{
				margin: 'auto',
				display: 'block'
			}} key={0} alt='logo' className='nav-img' src='./logo.1.svg' />,
			<MenuItem
				key={1}
				style={{
					backgroundColor: path === '/' ? yellow600 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/' ? white : yellow600, position: 'absolute', left: '40%' }} className="material-icons">change_history</FontIcon>}
				onClick={() => history.push('/')}>
				<span style={{
					position: 'absolute',
					left: '10%'
				}}>Home</span>
			</MenuItem>,

			<MenuItem
				key={2}
				style={{
					backgroundColor: path === '/wallet' ? yellow600 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/wallet' ? white : yellow600, position: 'absolute', left: '40%' }} className="material-icons">crop_square</FontIcon>}
				onClick={() => history.push('/wallet')}>
				<span style={{
					position: 'absolute',
					left: '10%'
				}}>Wallet</span>
			</MenuItem>,

			<MenuItem
				key={3}
				style={{
					backgroundColor: path === '/earn' ? yellow600 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/earn' ? white : yellow600, position: 'absolute', left: '40%' }} className="material-icons">star_border</FontIcon>}
				onClick={() => history.push('/earn')}>
				<span style={{
					position: 'absolute',
					left: '10%'
				}}>Rewards</span>
			</MenuItem>,

			<MenuItem
				key={4}
				style={{
					backgroundColor: path === '/market' ? yellow600 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/market' ? white : yellow600, position: 'absolute', left: '40%' }} className="material-icons">crop_7_5</FontIcon>}
				onClick={() => history.push('/market')}>
				<span style={{
					position: 'absolute',
					left: '10%'
				}}>Market</span>
			</MenuItem>,

			<MenuItem
				key={5}
				style={{
					backgroundColor: path === '/settings' ? yellow600 : null
				}}
				leftIcon={<FontIcon style={{ color: path === '/settings' ? white : yellow600, position: 'absolute', left: '40%' }} className="material-icons">details</FontIcon>}
				onClick={() => history.push('/settings')}>
				<span style={{
					position: 'absolute',
					left: '10%'
				}}>Settings</span>
			</MenuItem>,

			<List key={6} style={style.user_nav_view}>
				<ListItem disabled style={{
					justifyContent: 'center',
					display: 'flex'
				}}>
				</ListItem>
				<ListItem
					disabled
					className='center'
					onClick={() => history.push('/')}
					primaryText={user_data.username}
					secondaryText={user_data.email}
				/>
			</List>
		]

		return (
			<div>
				<br />
				<FontIcon onClick={() => {
					this.setState({ open: !this.state.open })
				}} style={{ color: path === '/' ? white : grey600, position: 'absolute', left: 20, paddingTop: '5px' }} className="material-icons">menu</FontIcon>
				<FlatButton onClick={() => logout()} style={{
					float: 'right',
					color: 'white',
					zIndex: 104
				}} label="Logout" />
				<br/>
				<Drawer onClick={() => this.setState({ open: false })} className="drawer left">
					{
						drawer_contents.map(i => i)
					}
				</Drawer>

				<Drawer docked={false} onRequestChange={() => this.setState({ open: false })} open={this.state.open} className="mobile_drawer left">
					{
						drawer_contents.map(i => i)
					}
				</Drawer>

			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		data: state.login
	}
}

function mapDispatchToProps(dispatch) {
	return {
		logout: bindActionCreators(logout, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)