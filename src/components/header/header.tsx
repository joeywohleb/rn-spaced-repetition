import { Body, Button, Header as Container, Left, Right, Text, Title } from 'native-base';
import React, { Component } from 'react';

import { NavigationService } from '../../services';

interface Props {
    children: string;
    headerLeft?: React.ReactElement | null;
    headerRight?: React.ReactElement;
}

export class Header extends Component<Props> {
    public static defaultProps: Props;

    public constructor(props: Props) {
        super(props);
    }

    public render() {
        return (
            <Container>
                <Left>{this.props.headerLeft}</Left>
                <Body>
                    <Title>{this.props.children}</Title>
                </Body>
                <Right>{this.props.headerRight}</Right>
            </Container>
        );
    }
}
Header.defaultProps = {
    children: '',
    headerLeft: (
        <Button hasText transparent onPress={NavigationService.goBack}>
            <Text>Back</Text>
        </Button>
    ),
};
