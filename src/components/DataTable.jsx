import React from 'react';

const DataTable = () => {
    const data = [
        {
            id: 1,
            clientName: 'Hans Burger',
            clientRole: '10x Developer',
            clientAvatar:
                'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            amount: '$863.45',
            status: 'Approved',
            statusColor: 'text-green-700 bg-green-100 dark:bg-green-700 dark:text-green-100',
            date: '6/10/2020',
        },
        {
            id: 2,
            clientName: 'Jolina Angelie',
            clientRole: 'Unemployed',
            clientAvatar:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6',
            amount: '$369.95',
            status: 'Pending',
            statusColor: 'text-orange-700 bg-orange-100 dark:bg-orange-600 dark:text-white',
            date: '6/10/2020',
        },
        {
            id: 3,
            clientName: 'Sarah Curry',
            clientRole: 'Designer',
            clientAvatar:
                'https://images.unsplash.com/photo-1551069613-1904dbdcda11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
            amount: '$86.00',
            status: 'Denied',
            statusColor: 'text-red-700 bg-red-100 dark:bg-red-700 dark:text-red-100',
            date: '6/10/2020',
        },
        // Add more data objects here
    ];

    return (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 py-3">Client</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                        {data.map((item) => (
                            <tr key={item.id} className="text-gray-700 dark:text-gray-400">
                                <td className="px-4 py-3">
                                    <div className="flex items-center text-sm">
                                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                            <img
                                                className="object-cover w-full h-full rounded-full"
                                                src={item.clientAvatar}
                                                alt={item.clientName}
                                                loading="lazy"
                                            />
                                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                        </div>
                                        <div>
                                            <p className="font-semibold">{item.clientName}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">{item.clientRole}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">{item.amount}</td>
                                <td className="px-4 py-3 text-xs">
                                    <span
                                        className={`px-2 py-1 font-semibold leading-tight rounded-full ${item.statusColor}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-sm">{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;
