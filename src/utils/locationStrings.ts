import {DirectoryLocations} from 'types'

type DropdownLocationObject = {
  title: string,
  location_ref: string
}

export const constructMidLocationString = ({address_line_1: addressLine1 = '', town_city: townCity = '', postcode = ''}): string => `${addressLine1 && `${addressLine1}, `}${townCity && `${townCity}, `}${postcode}`

// Creates a list of locations titles and refs for the dropdown component to consume
export const getLocationList = (locations: DirectoryLocations): DropdownLocationObject[] => locations.map(locationObj => {
  const {location_ref, location_metadata} = locationObj
  return {
    title: constructMidLocationString(location_metadata),
    location_ref,
  }
})
