import _ from 'lodash';
import { Button, Container, Content, Footer, Icon, Left, List, ListItem, Right, Row, Text } from 'native-base';
import React, { Component, ReactText } from 'react';

import SortableList, { RowProps } from 'react-native-sortable-list';
import { NavigationEvents } from 'react-navigation';
import { Header } from '../../components';
import { Deck } from '../../models';
import { createDeck, loadDecks, saveDeckOrder, selectWorkingDeck } from '../../store/decks';

interface Props {
    decks: Deck[];

    loadDecks: typeof loadDecks;
    selectWorkingDeck: typeof selectWorkingDeck;
    createDeck: typeof createDeck;
    saveDeckOrder: typeof saveDeckOrder;
}

interface State {
    isEditing: boolean;
    scrollEnabled: boolean;
    currentOrder: ReactText[];
}

export class ManageDecks extends Component<Props, State> {
    public constructor(props: Props) {
        super(props);

        this.state = {
            isEditing: false,
            scrollEnabled: true,
            currentOrder: _.orderBy(this.props.decks, 'order').map((d: Deck) => {
                return d.id;
            }),
        };
    }

    public render() {
        const decks = _.orderBy(this.props.decks, 'order').reduce((obj: any, item) => {
            obj[item.id] = item;
            return obj;
        }, {});

        const activeDecks = this.props.decks.filter((d: Deck) => d.isActive);
        const inactiveDecks = this.props.decks.filter((d: Deck) => !d.isActive);
        return (
            <Container>
                <Header
                    headerLeft={
                        this.state.isEditing ? (
                            <Button
                                hasText
                                transparent
                                onPress={() => this.setState({ isEditing: !this.state.isEditing })}
                            >
                                <Text>Cancel</Text>
                            </Button>
                        ) : (
                            undefined
                        )
                    }
                    headerRight={
                        <Button hasText transparent onPress={this.save}>
                            <Text>{this.state.isEditing ? 'Save' : 'Edit'}</Text>
                        </Button>
                    }
                >
                    Decks
                </Header>

                <NavigationEvents onDidBlur={() => this.setState({ isEditing: false })} />

                <Content scrollEnabled={this.state.scrollEnabled}>
                    {this.state.isEditing ? (
                        <List>
                            <SortableList
                                contentContainerStyle={{ flex: 1 }}
                                data={decks}
                                scrollEnabled={false}
                                order={this.state.currentOrder}
                                onActivateRow={() => this.setState({ scrollEnabled: false })}
                                onReleaseRow={() => this.setState({ scrollEnabled: true })}
                                onChangeOrder={(nextOrder) => this.setState({ currentOrder: nextOrder })}
                                renderRow={(row: RowProps) => (
                                    <Row
                                        key={row.key}
                                        style={{
                                            padding: 10,
                                            marginLeft: 7,
                                            flex: 1,
                                            borderBottomWidth: 0.5,
                                            borderColor: '#c9c9c9',
                                        }}
                                    >
                                        <Left>
                                            <Text>{row.data.name}</Text>
                                        </Left>
                                        <Right>
                                            <Icon name="reorder" />
                                        </Right>
                                    </Row>
                                )}
                            />
                        </List>
                    ) : (
                        <List>
                            {activeDecks.length > 0 && (
                                <ListItem itemDivider>
                                    <Text>Active</Text>
                                </ListItem>
                            )}
                            {activeDecks.map((d: Deck) => (
                                <ListItem key={d.id} onPress={() => this.props.selectWorkingDeck(d)}>
                                    <Left>
                                        <Text>{d.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            ))}

                            {inactiveDecks.length > 0 && (
                                <ListItem itemDivider>
                                    <Text>Inactive</Text>
                                </ListItem>
                            )}
                            {inactiveDecks.map((d: Deck) => (
                                <ListItem key={d.id} onPress={() => this.props.selectWorkingDeck(d)}>
                                    <Left>
                                        <Text>{d.name}</Text>
                                    </Left>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Content>
                <Footer>
                    <Button hasText transparent onPress={this.props.createDeck}>
                        <Text>Create Deck</Text>
                    </Button>
                </Footer>
            </Container>
        );
    }

    private save = () => {
        if (this.state.isEditing) {
            this.props.saveDeckOrder(this.state.currentOrder);
        }
        this.setState({ isEditing: !this.state.isEditing });
    };
}
