import React from 'react'
import { connect } from 'react-redux'
import ReactSelect from 'react-select'

import groupManagementActions from '../../reducers/actions/groupManagementActions'

const AutocompletedUserSelect = ({
  suggestions,
  isLoading,
  onSearch,
  onUserIdChange
}) => {
  const handleInputChange = (text) => {
    if (text.length >= 3) {
      onSearch(text)
    }
  }

  const handleChange = (selectedOption, { action }) => {
    if (action === 'clear') {
      // selectedOption is null
      onUserIdChange('')
    } else if (action === 'select-option') {
      // selectedOption = { value, label }
      onUserIdChange(selectedOption.value)
    }
  }

  const inputOptions = suggestions.map(
    ({ student_number, first_names, last_name }) => ({
      value: student_number,
      label: `${first_names} ${last_name}`
    })
  )

  return (
    <ReactSelect
      isLoading={isLoading}
      options={inputOptions}
      onChange={handleChange}
      onInputChange={handleInputChange}
      placeholder="Enter 3 characters..."
      isClearable
    />
  )
}

const mapStateToProps = (state) => ({
  isLoading: state.groupPage.userAutocompleteLoading,
  suggestions: state.groupPage.userAutocompleteSuggestions
})

const mapDispatchToProps = {
  onSearch: groupManagementActions.fetchUserAutocompleteSuggestions
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompletedUserSelect)
