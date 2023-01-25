import {DirectoryLocations} from 'types'

type DropdownLocationObject = {
  title: string,
  location_ref: string
}

// Creates a list of locations titles and refs for the dropdown component to consume
export const getLocationList = (locations: DirectoryLocations): DropdownLocationObject[] => locations.map(locationObj => {
  const {location_ref, location_metadata} = locationObj
  return {
    title: location_metadata.name,
    location_ref,
  }
})
