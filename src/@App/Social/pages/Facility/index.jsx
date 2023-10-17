import React, { useEffect } from 'react'
import { useRequest } from 'ahooks'
import { facilityService } from '@App/Social/services/facilityService'
import FacilityList from './FacilityList'

const HomePage = props => {

	const {
		data: facility,
		run: getFacility,
		loading: loadingFacility
	} = useRequest(facilityService.getListPost, {
		manual: true
	})

	return <FacilityList facility={facility} getFacility={getFacility} loadingFacility={loadingFacility}/>
}

export default React.memo(HomePage)
