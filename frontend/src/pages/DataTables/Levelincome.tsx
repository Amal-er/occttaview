import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../Slice/index';
import { setPageTitle, toggleRTL } from '../../Slice/themeConfigSlice';
import IconBell from '../../components/Icon/IconBell';
import { fetchLevelIncome1, fetchLevelIncome2, fetchLevelIncome3 } from '../../Slice/userSlice';
import Header from '../../components/Layouts/Header';
import StepLevel from '../Authentication/StepLevel';

const Levelincome = () => {
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<any>(1);
    const { loading, data: rowData, error } = useAppSelector((state: any) => state.levelIncomeReducer1);
    const { loading: level2Loading, data: level2Data, error: level2Error } = useAppSelector((state: any) => state.levelIncomeReducer2);
    const { loading: level3Loading, data: level3Data, error: level3Error } = useAppSelector((state: any) => state.levelIncomeReducer3);
    useEffect(() => {
        dispatch(fetchLevelIncome1());
    }, [dispatch, level2Data]);
    useEffect(() => {
        dispatch(setPageTitle('Skin Tables'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(rowData || []);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [search, setSearch] = useState('');
    useEffect(() => {
        setPage(1);
    }, [pageSize]);
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);
    useEffect(() => {
        setInitialRecords(() => {
            return Array.isArray(rowData)
                ? rowData.filter((item: any) => {
                      return (
                          item.userID.toLowerCase().includes(search.toLowerCase()) ||
                          item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.capitalAmount.toLowerCase().includes(search.toLowerCase()) ||
                          item.LevelAmountCredited.toLowerCase().includes(search.toLowerCase())
                      );
                  })
                : [];
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, rowData]);
    // Level 2 Data
    const levelTwoHandler = () => {
        setActiveTab(2);
        dispatch(fetchLevelIncome2(2));
    };
    const levelThreeHandler = () => {
        setActiveTab(3);
        dispatch(fetchLevelIncome3(3));
    };
    // const levelFourHandler = () => {
    //     setActiveTab(4);
    //     dispatch(fetchLevelIncome3(4));
    // };
    return (
        <div className="inline-block w-full">
            <Header />
            <ul className="mb-5 grid grid-cols-4 gap-2 text-center">
                <li>
                    <div
                        className={`${activeTab === 1 ? '!bg-primary text-white' : ''}
                block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`}
                        onClick={() => setActiveTab(1)}
                    >
                        Level 1
                    </div>
                </li>
                <li>
                    <div className={`${activeTab === 2 ? '!bg-primary text-white' : ''} block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`} onClick={levelTwoHandler}>
                        Level 2
                    </div>
                </li>
                <li>
                    <div className={`${activeTab === 3 ? '!bg-primary text-white' : ''} block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`} onClick={levelThreeHandler}>
                        Level 3
                    </div>
                </li>
                <li>
                    {/* <div className={`${activeTab === 4 ? '!bg-primary text-white' : ''} block rounded-full bg-[#F3F2EE] p-2.5 dark:bg-[#1B2E4B]`} onClick={levelFourHandler}>
                        Level 4
                    </div> */}
                </li>
            </ul>
            <div>
                <div className="mb-5">
                    {activeTab === 1 && (
                        <div className="space-y-6">
                            <div className="panel">
                                <div className="datatables">
                                    {/* Render DataTable for Level 1 */}
                                    <DataTable
                                        striped
                                        className="whitespace-nowrap table-striped"
                                        records={recordsData}
                                        columns={[
                                            { accessor: 'userID', title: 'userID' },
                                            { accessor: 'name', title: 'name' },
                                            { accessor: 'capitalAmount', title: 'Sponsor ID' },
                                            { accessor: 'LevelAmountCredited', title: 'LevelAmountCredited' },
                                        ]}
                                        totalRecords={initialRecords ? initialRecords.length : 0}
                                        recordsPerPage={pageSize}
                                        page={page}
                                        onPageChange={(p) => setPage(p)}
                                        recordsPerPageOptions={PAGE_SIZES}
                                        onRecordsPerPageChange={setPageSize}
                                        minHeight={200}
                                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mb-5">{activeTab === 2 && <StepLevel level={2} />}</div>
                <div className="mb-5">{activeTab === 3 && <StepLevel level={3} />}</div>
                {/* Additional components for other levels */}
            </div>
            <div className="flex justify-between">
                <button type="button" className={`btn btn-primary ${activeTab === 1 ? 'hidden' : ''}`} onClick={() => setActiveTab(activeTab === 3 ? 2 : 1)}>
                    Back
                </button>
                <button type="button" className="btn btn-primary ltr:ml-auto rtl:mr-auto" onClick={() => setActiveTab(activeTab === 1 ? 2 : 3)}>
                    {activeTab === 3 ? 'Finish' : 'Next'}
                </button>
            </div>
        </div>
    );
};
export default Levelincome;
