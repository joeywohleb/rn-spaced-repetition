import { Button, Container, Content, Form, Input, Item, Text, Toast } from 'native-base';
import React, { Component } from 'react';

import { Header } from '../../components';
import { NavigationService } from '../../services';

interface Props {}

interface State {
    email: string;
    password: string;
}

export class AccountSignup extends Component<Props, State> {
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
                    Signup
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Email Address"
                                onChangeText={(email: string) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </Item>
                        <Item last>
                            <Input
                                secureTextEntry={true}
                                placeholder="Password"
                                onChangeText={(password: string) => this.setState({ password })}
                                value={this.state.password}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }

    private registerUser = async () => {
        const response = await fetch('https://spaced-repetition-api.joeywohleb.com/register', {
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
        if (result === 'email already registered') {
            Toast.show({
                text: 'Email already registered!',
                buttonText: 'Okay',
            });
            return;
        }

        Toast.show({
            text: 'Account created!',
            buttonText: 'Okay',
        });
        NavigationService.goBack();
    };
}
