import React, { Component } from 'react';
import { StyleSheet, View, Text, ImageBackground, Dimensions, Button, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import FloatingLabel from 'react-native-floating-labels';
import { CommonStyle, defaultGray } from "../_styles";

const navigationBack = require('../../../assets/images/back_icon.png');

class AlbumSelectCompositorScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        var clickBack = () => { };

        let params = navigation.state.params;

        if (params && params.clickBack) {
            clickBack = params.clickBack;
        }
        return {
            headerTitle: () => null,
            headerLeft: () => (
                <TouchableOpacity
                    onPress={clickBack}
                    style={CommonStyle.navigationBackContainer}
                >
                    <Image
                        source={navigationBack}
                        style={CommonStyle.navigationBackIcon}
                        resizeMode="contain"
                    />
                    <Text style={CommonStyle.navigationBackText}>Back</Text>
                </TouchableOpacity>
            ),
            headerRight: null,
            headerStyle: CommonStyle.headerStyle
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            composerFirstName: '',
            composerFamilyName: ''
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            clickBack: this.clickBackButton
        })
    }

    clickBackButton = () => {
        let {composerFirstName, composerFamilyName} = this.state;

        if (composerFirstName.trim() == '' || composerFamilyName.trim() == '') {
            this.props.navigation.goBack();

            return;
        }

        const data = {
            composerFirstName,
            composerFamilyName
        };

        global.refreshEmitter.emit("ALBUM_ADD_COMPOSER", {data: data});

        this.props.navigation.goBack();
    }

    render() {
        let { composerFirstName, composerFamilyName } = this.state;
        return (
            <View style={CommonStyle.container}>
                <ScrollView style={myStyles.scroll}>
                    <View>
                        <Text style={CommonStyle.commonTitle}>
                            {"Compositor"}
                        </Text>
                    </View>
                    
                    <View style={CommonStyle.marginTop_5}>
                        <Text style={CommonStyle.smallComment}>{"Add compositors or beatmaker who worked on this song."}</Text>
                    </View>

                    <View style={CommonStyle.marginTop_20}>
                        <FloatingLabel
                            labelStyle={CommonStyle.labelInput}
                            inputStyle={CommonStyle.input}
                            style={CommonStyle.formInput}
                            value={composerFirstName}
                            onChangeText={
                                text=> this.setState({composerFirstName: text})
                            }
                            >
                                First Name / Prénom
                        </FloatingLabel>
                    </View>
                    <View style={CommonStyle.marginTop_20}>
                        <FloatingLabel
                            labelStyle={CommonStyle.labelInput}
                            inputStyle={CommonStyle.input}
                            style={CommonStyle.formInput}
                            value={composerFamilyName}
                            onChangeText={
                                text=> this.setState({composerFamilyName: text})
                            }
                            >
                                Last Name / Nom de Famille
                        </FloatingLabel>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export const myStyles = StyleSheet.create({
    scroll: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    checkBoxIconContainer: {
        flex: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        flexDirection: 'row'
    },
});

export default AlbumSelectCompositorScreen;