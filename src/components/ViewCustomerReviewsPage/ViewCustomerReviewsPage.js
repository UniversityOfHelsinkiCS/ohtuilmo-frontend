import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import * as notificationActions from '../../reducers/actions/notificationActions'
import configurationPageActions from '../../reducers/actions/configurationPageActions'
import viewCustomerReviewsPageActions from '../../reducers/actions/viewCustomerReviewsPageActions'

import customerReviewService from '../../services/customerReview'
import LoadingCover from './../common/LoadingCover'

import './ViewCustomerReviewsPage.css'

//ei toimi atm

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
        },
        {
          id: 4,
          type: 'text',
          answer:
            'Hyvä fiilis fiilis Hyvä fiilis fiilis Hyvä fiilis fiilis Hyvä fiilis fiilis Hyvä fiilis fiilis',
          questionHeader: 'Mikä fiilis?'
        }
      ]
    }
  }
]

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

    const CustomerReviewsContainer = (props) => {
      const { reviews } = props
      console.log(reviews)
      return reviews.map((review) => (
        <Group group={review.group} key={review.group.id} />
      ))
    }

    const Group = ({ group }) => {
      if (group.answerSheet === null || group.answerSheet === undefined) {
        return (
          <div className="customer-reviews-container__group">
            <h2> {group.name} </h2>
            <p> No review submitted for group {group.name}</p>
          </div>
        )
      } else {
        return (
          <div className="customer-reviews-container__group">
            <h2> {group.name} </h2>
            <Answers answerSheet={group.answerSheet} />
          </div>
        )
      }
    }

    const Answers = ({ answerSheet }) => {
      return answerSheet.map((answer) => {
        if (answer.type === 'text') {
          return <TextAnswer answer={answer} key={answer.id} />
        } else {
          return <NumberAnswer answer={answer} key={answer.id} />
        }
      })
    }

    const TextAnswer = ({ answer }) => {
      return (
        <div className="customer-reviews-container__group__text-answer">
          <h3> {answer.questionHeader} </h3>
          <p>
            <b>Customer's answer:</b> {answer.answer}
          </p>
        </div>
      )
    }

    const NumberAnswer = ({ answer }) => {
      return (
        <div className="customer-reviews-container__group__number-answer">
          <h3> {answer.questionHeader} </h3>
          <p>
            {' '}
            <b>Customer's answer:</b> {answer.answer}{' '}
          </p>
        </div>
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

    const DownloadButton = ({ jsonData, fileName }) => {
      const data = `text/json;charset=utf-8,${encodeURIComponent(jsonData)}`
      const href = `data:${data}`

      return (
        <Button
          className="customer-review-download-button"
          component="a"
          href={href}
          download={fileName}
          variant="contained"
          color="primary"
        >
          Download as JSON
        </Button>
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
          <DownloadButton
            jsonData={JSON.stringify(fakeData)}
            fileName="customerReviews.json"
          />
          <h1 class="customer-reviews-h1">Customer reviews</h1>
          <CustomerReviewsContainer reviews={fakeData} />
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
