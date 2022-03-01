import { registerEnumType } from '@nestjs/graphql';

export enum JournalEntryScalarFieldEnum {
    id = "id",
    userId = "userId",
    date = "date",
    json = "json"
}


registerEnumType(JournalEntryScalarFieldEnum, { name: 'JournalEntryScalarFieldEnum', description: undefined })
