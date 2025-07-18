import React from 'react';
import {
    List, Datagrid, TextField, DateField,
    Create, Edit, SimpleForm, TextInput,
    DateTimeInput, ArrayInput, SimpleFormIterator,
    BooleanInput, ReferenceInput, SelectInput,
    NumberInput, required
} from 'react-admin';
import YandexMapInput from './Map';

interface FormData {
    category: { id: string };
    title: string;
    description?: string;
    placeAddress: string;
    latitude: string;
    longitude: string;
    starts_at: string;
    ends_at: string;
    photos: { url: string; alt_text?: string; is_main?: boolean }[];
    people: { name: string; tagName: string }[];
    organization: string;
    ticket_price: number;
}

const transform = (data: FormData) => ({
    category:    { id: data.category.id },
    title:       data.title,
    description: data.description,
    place: {
        address:   data.placeAddress,
        latitude:  parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
    },
    starts_at:    data.starts_at,
    ends_at:      data.ends_at,
    photos:       data.photos,
    people:       data.people.map(p => ({
        name: p.name,
        tag:  { name: p.tagName },
    })),
    organization: data.organization,
    ticket_price: data.ticket_price,
});

export const EventList: React.FC = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="title"        label="Заголовок" />
            <TextField source="organization" label="Организация" />
            <DateField source="starts_at"    label="Начало" />
            <DateField source="ends_at"      label="Окончание" />
            <TextField source="ticket_price" label="Цена билета" />
        </Datagrid>
    </List>
);

export const EventCreate: React.FC = props => (
    <Create {...props} transform={transform}>
        <SimpleForm>
            <ReferenceInput
                source="category.id"
                reference="categories"
                label="Категория"
            >
                <SelectInput
                    optionText="name"
                    validate={required()}
                />
            </ReferenceInput>

            <TextInput source="title"         label="Заголовок"    validate={required()} />
            <TextInput source="organization"  label="Организация"  validate={required()} />
            <NumberInput source="ticket_price" label="Цена билета" validate={required()} />
            <TextInput source="description"   label="Описание"     multiline />

            <TextInput
                source="placeAddress"
                label="Адрес"
                helperText="город, улица, дом"
                validate={required()}
            />

            <YandexMapInput
                latitudeSource="latitude"
                longitudeSource="longitude"
                label="Выберите точку на карте"
                defaultCenter={[55.76, 37.64]}
                defaultZoom={10}
            />

            <DateTimeInput source="starts_at" label="Дата и время начала"   validate={required()} />
            <DateTimeInput source="ends_at"   label="Дата и время окончания" validate={required()} />

            <ArrayInput source="photos" label="Фотографии">
                <SimpleFormIterator>
                    <TextInput source="url"      label="URL фотографии" validate={required()} />
                    <TextInput source="alt_text" label="Описание (alt)" />
                    <BooleanInput source="is_main" label="Главная" />
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source="people" label="Участники и организаторы">
                <SimpleFormIterator>
                    <TextInput source="name"    label="ФИО"  validate={required()} />
                    <TextInput source="tagName" label="Роль" helperText="например: спикер…" validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

export const EventEdit: React.FC = props => (
    <Edit {...props} transform={transform}>
        <SimpleForm>
            <ReferenceInput
                source="category.id"
                reference="categories"
                label="Категория"
            >
                <SelectInput
                    optionText="name"
                    validate={required()}
                />
            </ReferenceInput>

            <TextInput source="title"         label="Заголовок"    validate={required()} />
            <TextInput source="organization"  label="Организация"  validate={required()} />
            <NumberInput source="ticket_price" label="Цена билета" validate={required()} />
            <TextInput source="description"   label="Описание"     multiline />

            <TextInput
                source="placeAddress"
                label="Адрес"
                helperText="город, улица, дом"
                validate={required()}
            />

            <YandexMapInput
                latitudeSource="latitude"
                longitudeSource="longitude"
                label="Выберите точку на карте"
                defaultCenter={[55.76, 37.64]}
                defaultZoom={10}
            />

            <DateTimeInput source="starts_at" label="Дата и время начала"   validate={required()} />
            <DateTimeInput source="ends_at"   label="Дата и время окончания" validate={required()} />

            <ArrayInput source="photos" label="Фотографии">
                <SimpleFormIterator>
                    <TextInput source="url"      label="URL фотографии" validate={required()} />
                    <TextInput source="alt_text" label="Описание (alt)" />
                    <BooleanInput source="is_main" label="Главная" />
                </SimpleFormIterator>
            </ArrayInput>

            <ArrayInput source="people" label="Участники и организаторы">
                <SimpleFormIterator>
                    <TextInput source="name"    label="ФИО"  validate={required()} />
                    <TextInput source="tagName" label="Роль" helperText="например: спикер…" validate={required()} />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);