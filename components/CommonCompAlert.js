import { Alert, Platform } from 'react-native'

const alertPolyfill = (title, description, options, extra) => {
    const result = window.confirm([title, description].filter(Boolean).join('\n'))
    console.log(result)
    if (result) {
        const confirmOption = options.find(({ style }) => style !== 'cancel')
        // confirmOption && confirmOption.onPress() TODO: error pro
    } else {
        const cancelOption = options.find(({ style }) => style === 'cancel')
        cancelOption && cancelOption.onPress()
    }
}

const alert = Platform.OS === 'web' ? alertPolyfill : Alert.alert

export default alert