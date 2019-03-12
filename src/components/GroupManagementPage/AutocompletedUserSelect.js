import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactSelect from 'react-select'

import groupManagementActions from '../../reducers/actions/groupManagementActions'

const MIN_CHARS = 2

const toReactSelectOption = (autocompleteUser) => ({
  value: autocompleteUser.student_number,
  label: `${autocompleteUser.first_names} ${autocompleteUser.last_name}`
})

const AutocompletedUserSelect = ({
  defaultUser,
  suggestions,
  isLoading,
  onSearch,
  onUserIdChange
}) => {
  const handleInputChange = (text) => {
    if (text.length >= MIN_CHARS) {
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

  const inputOptions = suggestions.map(toReactSelectOption)

  return (
    <ReactSelect
      defaultValue={defaultUser && toReactSelectOption(defaultUser)}
      isLoading={isLoading}
      options={inputOptions}
      onChange={handleChange}
      onInputChange={handleInputChange}
      placeholder="Search by name"
      isClearable
    />
  )
}

const autosuggestUserShape = PropTypes.shape({
  student_number: PropTypes.string.isRequired,
  first_names: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired
})

AutocompletedUserSelect.propTypes = {
  // connected props
  suggestions: PropTypes.arrayOf(autosuggestUserShape).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  // own props
  onUserIdChange: PropTypes.func.isRequired,
  defaultUser: autosuggestUserShape
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
