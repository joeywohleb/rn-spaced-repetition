import { Button, Container, Content, Footer, Form, Input, Item, Label, Text, Toast } from 'native-base';
import React, { Component } from 'react';

import { Header } from '../../components';
import { NavigationService } from '../../services';

interface Props {}

interface State {
    email: string;
    password: string;
}

export class Login extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    public render() {
        return (
            <Container>
                <Header
                    headerRight={
                        <Button hasText transparent onPress={this.registerUser}>
                            <Text>Save</Text>
                        </Button>
                    }
                >
                    Login
                </Header>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email Address</Label>
                            <Input
                                onChangeText={(email: string) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                onChangeText={(password: string) => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                    </Form>
                </Content>
                <Footer>
                    <Button hasText transparent onPress={() => NavigationService.navigateTo('AccountSignup')}>
                        <Text>Register</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }

    private registerUser = async () => {
        const response = await fetch('https://spaced-repetition-api.joeywohleb.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        });

        if (response.status !== 200) {
            Toast.show({
                text: response.statusText,
                buttonText: 'Okay',
            });
            return;
        }
        const result = await response.json();

        if (result.token) {
            Toast.show({
                text: 'Login successful!',
                buttonText: 'Okay',
            });
        } else {
            Toast.show({
                text: 'Incorrect email or password',
                buttonText: 'Okay',
            });
            return;
        }
        NavigationService.goBack();
    };
}
