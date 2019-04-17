import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import * as notificationActions from '../../reducers/actions/notificationActions'
import configurationPageActions from '../../reducers/actions/configurationPageActions'
import viewCustomerReviewsPageActions from '../../reducers/actions/viewCustomerReviewsPageActions'

import customerReviewService from '../../services/customerReview'

import LoadingCover from './../common/LoadingCover'

//ei toimi atm
const ViewGroups = (reviewData) => {
  console.log(reviewData)

  /*   if(reviewData.length > 0){ */

  return reviewData.map((group) => <div>{group.name}</div>)
  /*   } else {
    return null
  } */
}

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
    const { isInitializing } = this.props

    const handleConfiguartionChange = async (confId) => {
      this.props.setLoading(true)
      this.props.setConfiguration(confId)
      console.log(confId)

      this.props.setReviewData(
        await customerReviewService.getCustomerReviewAnswers(confId)
      )
    }

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

    if (this.props.reviewFetched) {
      return (
        <div className="topics-container">
          {isInitializing && (
            <LoadingCover className="topics-container__loading-cover" />
          )}

          <Select
            value={this.props.configuration}
            onChange={(event) => handleConfiguartionChange(event.target.value)}
          >
            {configurationMenuItems()}
          </Select>

          <ViewGroups reviewData={this.props.reviewData} />
        </div>
      )
    } else {
      return (
        <div className="topics-container">
          {isInitializing && (
            <LoadingCover className="topics-container__loading-cover" />
          )}

          <Select
            value={this.props.configuration}
            onChange={(event) => handleConfiguartionChange(event.target.value)}
          >
            {configurationMenuItems()}
          </Select>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    reviewFetched: state.viewCustomerReviewsPage.reviewFetched,
    isInitializing: state.viewCustomerReviewsPage.isInitializing,
    reviewData: state.viewCustomerReviewsPage.reviewData,
    configuration: state.viewCustomerReviewsPage.configurationId,
    configurations: state.configurationPage.configurations
  }
}

const mapDispatchToProps = {
  setLoading: viewCustomerReviewsPageActions.setLoading,
  setReviewData: viewCustomerReviewsPageActions.setReviewData,
  setConfiguration: viewCustomerReviewsPageActions.setConfiguration,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess,
  fetchConfigurations: configurationPageActions.fetchConfigurations
}

const ConnectedViewCustomerReviewsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewCustomerReviewsPage)

export default withRouter(ConnectedViewCustomerReviewsPage)
