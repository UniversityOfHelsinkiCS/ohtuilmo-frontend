import React from 'react'
import Menu from '@material-ui/core/Menu'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import MenuIcon from '@material-ui/icons/Menu'

class NavigationMenu extends React.Component {
  state = {
    anchorEl: null
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.menuItems.map(item => (
            <MenuItem onClick={item.handler} key={item.text} >{item.text}</MenuItem>
          ))}
        </Menu>
      </div>
    )
  }
}

export default NavigationMenu
