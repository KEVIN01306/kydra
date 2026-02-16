import { Button, CheckBox, Navbar, NavbarPosition, Table, TableColumn } from '@kydra/ui';
import { useState } from 'react';
import { 
  Trash2, 
  Eye,
  Sun,
  Moon, 
} from 'lucide-react';

interface Identifiable {
  id: string | number;
}
interface UserData extends Identifiable {
  name: string;
  role: string;
  status: string;
  salary: number;
}

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [localData, setLocalData] = useState<UserData[]>(Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: ['Alex Rivera', 'Sofia Castro', 'Marcos Peña', 'Elena Soler', 'Iker Casillas'][i % 5],
    role: ['Diseñador UI', 'Fullstack Dev', 'Project Manager', 'QA Engineer', 'Backend Dev'][i % 5],
    status: ['Activo', 'Pendiente', 'Inactivo'][i % 3],
    salary: Math.floor(Math.random() * 50000) + 20000
  })));
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [navPosition, setNavPosition] = useState<NavbarPosition>("static");
  const [isNavDominant, setIsNavDominant] = useState(false);
  const columns: TableColumn<UserData>[] = [
    { 
      header: 'Usuario', 
      accessor: 'name', 
      filter: true,
      format: (val: string, _, highlight) => (
        <div className="flex items-center gap-3">
          <div style={{ backgroundColor: `${highlight}15`, color: highlight }} className="flex h-8 w-8 items-center justify-center rounded-lg font-bold text-xs">{val.charAt(0)}</div>
          <span className="font-semibold text-slate-900 dark:text-white">{val}</span>
        </div>
      )
    },
    { header: 'Rol', accessor: 'role', filter: true },
    { 
      header: 'Estado', 
      accessor: 'status', 
      align: 'center',
      filter: true,
      format: (val: string, _, highlight) => {
        const isActive = val === 'Activo';
        return <span style={isActive ? { backgroundColor: `${highlight}15`, color: highlight } : {}} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${!isActive ? 'bg-slate-100 text-slate-500 dark:bg-slate-800/50' : ''}`}>{val}</span>;
      }
    },
    { header: 'Salario', accessor: 'salary', align: 'right',filter: true, format: (val: number) => <span className="font-mono">${val.toLocaleString()}</span> },
    { header: 'Acciones', accessor: 'id', align: 'right', actions: [
      { label: 'Detalles', icon: Eye, onClick: (r: any) => console.log(r) },
      { label: 'Borrar', icon: Trash2, onClick: (r: any) => setLocalData(d => d.filter(x => x.id !== r.id)), color: 'text-red-500' },
    ]}
  ];
  return (
    <div className={`${isDarkMode ? 'dark' : ''} dark:bg-slate-950`}> {/* Si quitas "dark", vuelve al modo claro */}
        <Navbar 
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: accentColor }}>K</div>
            <span>Kydra UI</span>
          </div>
        }
        position={navPosition}
        color={accentColor}
        colorDominant={isNavDominant}
        isMenuOpen={isNavMenuOpen}
        onToggleMenu={() => setIsNavMenuOpen(!isNavMenuOpen)}
      >
        <a href="#" className="text-sm font-medium hover:opacity-70">Docs</a>
        <a href="#" className="text-sm font-medium hover:opacity-70">Github</a>
        <Button label="Login" kd={{ minWidth: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem' }} color={isNavDominant ? 'white' : accentColor} variant={isNavDominant ? 'ghost-hover' : 'filled'} />
        <CheckBox label='boton de login' value={true} color={accentColor} />
      </Navbar>
      <div className="min-h-screen bg-white p-10 dark:bg-slate-950">
        <div className={`p-6 rounded-3xl border flex items-center justify-between transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Gestión de Usuarios</h1>
          <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:opacity-80 transition-all"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
        <h1 className="text-2xl font-bold dark:text-white m-3">Kydra Dashboard</h1>
         <Table 
          data={localData} 
          columns={columns} 
          selectable={true}
          filter={true}
          add={true}
          darkMode={isDarkMode} // <--- Propiedad enviada aquí
          color={accentColor}
          customArrayPagination={[5,30,40,50,100]}
          defaultPageSize={5}
          pagination={true}
          excelExport={true}
          onDeleteRows={(ids) => setLocalData(d => d.filter(x => !ids.includes(x.id)))}
        />
      </div>
    </div>
  );
}