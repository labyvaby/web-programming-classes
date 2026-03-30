import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import IntensivesPage from './pages/IntensivesPage';
import PageLoader from './components/ui/PageLoader';
import { I18nProvider } from './i18n';

const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const LessonPage       = lazy(() => import('./pages/LessonPage'));
const ProfilePage      = lazy(() => import('./pages/ProfilePage'));
const AddCoursePage    = lazy(() => import('./pages/AddCoursePage'));
const PlansPage        = lazy(() => import('./pages/PlansPage'));
const ChangelogPage    = lazy(() => import('./pages/ChangelogPage'));
const LinksPage        = lazy(() => import('./pages/LinksPage'));
const AgreementPage    = lazy(() => import('./pages/docs/AgreementPage'));
const PrivacyPage      = lazy(() => import('./pages/docs/PrivacyPage'));
const LegalPage        = lazy(() => import('./pages/docs/LegalPage'));
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <I18nProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans selection:bg-primary/30">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Navigate to="/intensives" replace />} />
                <Route path="/intensives" element={<IntensivesPage />} />
                <Route path="/master-classes" element={<Navigate to="/intensives" replace />} />
                <Route path="/course/:id" element={<CourseDetailPage />} />
                <Route path="/course/:id/lesson/:lessonId" element={<LessonPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/add-course" element={<AddCoursePage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/changelog" element={<ChangelogPage />} />
                <Route path="/links" element={<LinksPage />} />
                <Route path="/docs/agreement" element={<AgreementPage />} />
                <Route path="/docs/privacy" element={<PrivacyPage />} />
                <Route path="/docs/legal" element={<LegalPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </I18nProvider>
  );
}

export default App;
