import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import * as notificationActions from '../../reducers/actions/notificationActions'
import configurationPageActions from '../../reducers/actions/configurationPageActions'

import LoadingCover from './../common/LoadingCover'

const fakeData = [
  {
    group: {
      id: 1,
      name: 'Aihe B',
      answerSheet: null
    }
  },
  {
    group: {
      id: 2,
      name: 'Aihe A',
      answerSheet: [
        {
          id: 0,
          type: 'text',
          answer:
            '5000 merkkiä 5000 merkkiä 5000 merkkiä 5000 merkkiä 5000 merkkiä 5000 merkkiä',
          questionHeader: 'Mitä mieltä olit tykittelystä?'
        },
        {
          id: 1,
          type: 'number',
          answer: 7,
          questionHeader: 'Monta tuntia viikossa olit yhteydessä tiimiin?'
        },
        {
          id: 2,
          type: 'range',
          answer: '4',
          questionHeader: 'Minkä arvosanan antaisit tiimille?',
          questionOptions: ['1', '2', '3', '4', '5']
        }
      ]
    }
  }
]

class ViewCustomerReviewsPage extends React.Component {
  async componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        this.props.history.push('/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!token.user.admin || token === undefined || token === null) {
          this.props.history.push('/')
        }
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened', 3000)
    }
  }

  async componentDidMount() {
    await this.props.fetchConfigurations()
  }

  render() {
    const { isLoading } = this.props

    const configurationMenuItems = () => {
      const { configurations } = this.props
      return []
        .concat(
          <MenuItem value={0} key={0}>
            All configurations
          </MenuItem>
        )
        .concat(
          configurations.map((configuration) => (
            <MenuItem value={configuration.id} key={configuration.id}>
              {configuration.name}
            </MenuItem>
          ))
        )
    }

    return (
      <div className="topics-container">
        {isLoading && (
          <LoadingCover className="topics-container__loading-cover" />
        )}

        <Select
        //value={filter}
        //onChange={(event) => this.props.updateFilter(event.target.value)}
        >
          {configurationMenuItems()}
        </Select>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configurations: state.configurationPage.configurations
  }
}

const mapDispatchToProps = {
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess,
  fetchConfigurations: configurationPageActions.fetchConfigurations
}

const ConnectedViewCustomerReviewsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCustomerReviewsPage)

export default withRouter(ConnectedViewCustomerReviewsPage)
