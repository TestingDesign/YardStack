import { useState, useCallback, memo } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { COURSES, type Course } from './data'
import LearnTabs from './LearnTabs'

const ITEMS_PER_PAGE = 10

interface CourseCardProps {
  course: Course
  index: number
}

const CourseCard = memo(function CourseCard({ course, index }: CourseCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation()
    setIsMenuOpen(false)
    console.log(`${action} clicked for course:`, course.id)
  }

  const animationDelay = `${(index % ITEMS_PER_PAGE) * 0.05}s`

  return (
    <div 
      className="relative ys-fade-in-up"
      style={{ animationDelay }}
    >
      <div 
        className={`
          group relative flex gap-3 p-2.5 @md:p-3 border border-gray-100 rounded-lg bg-white cursor-pointer
          transition-all duration-300 ease-out hover:border-gray-200 
          hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:-translate-y-px
          ${isMenuOpen ? 'z-50 shadow-md border-gray-200' : 'z-10'}
        `}
      >
        <div className="absolute top-2 right-2 z-60">
          <button 
            onClick={toggleMenu}
            className={`
              text-gray-400 hover:text-[#1f1633] transition-colors p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50
              ${isMenuOpen ? 'bg-gray-100 text-[#1f1633]' : 'hover:bg-gray-50'}
            `}
            aria-label="More options"
          >
            <MoreVertIcon sx={{ fontSize: 16 }} />
          </button>

          {isMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-99" 
                onClick={(e) => {
                  e.stopPropagation()
                  setIsMenuOpen(false)
                }} 
              />
              
              <div className="absolute top-full right-0 mt-1 w-36 bg-white rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 py-1 z-100 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <button 
                  onClick={(e) => handleMenuAction(e, 'share')}
                  className="w-full text-left px-3 py-2 text-[11px] font-semibold text-[#1f1633] hover:bg-gray-50 transition-colors focus-visible:bg-gray-50 focus:outline-none"
                >
                  Share Course
                </button>
                <button 
                  onClick={(e) => handleMenuAction(e, 'reset')}
                  className="w-full text-left px-3 py-2 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 transition-colors focus-visible:bg-rose-50 focus:outline-none"
                >
                  Reset Progress
                </button>
              </div>
            </>
          )}
        </div>

        <div className="relative w-24 h-20 @md:w-32 @md:h-24 rounded-md overflow-hidden shrink-0 shadow-sm border border-black/5">
          <img 
            src={course.image} 
            alt={course.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-1.5 left-1.5 bg-white/90 backdrop-blur-md text-[#1f1633] text-[9px] font-extrabold px-1.5 py-0.5 rounded-sm shadow-sm tracking-wide">
            {course.lessons} Lessons
          </div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 py-0.5">
          <div className="pr-6">
            <h3 className="text-[13px] @md:text-[14px] font-medium text-[#1f1633] leading-snug line-clamp-2">
              {course.title}
            </h3>
          </div>

          <div className="mt-auto pt-2 flex items-end justify-between w-full gap-2 min-w-0">
            <div className="flex flex-col gap-1.5 w-full max-w-32.5">
              <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                {course.progress}% Complete
              </span>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-linear-to-r from-[#ec4899] to-[#d946ef] rounded-full transition-all duration-700 ease-out" 
                  style={{ width: `${course.progress}%` }} 
                />
              </div>
            </div>

            <button 
              aria-label="View course" 
              className="
                flex items-center justify-center w-7 h-7 rounded-md shrink-0
                bg-[#f3f0ff] text-[#6a5fc1]
                group-hover:bg-[#6a5fc1] group-hover:text-white group-hover:shadow-md
                transition-all duration-300 active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/50
              "
            >
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default function Learn() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)

  const filteredCourses = activeFilter === 'all'
    ? COURSES
    : COURSES.filter(c => c.category === activeFilter)

  const displayedCourses = filteredCourses.slice(0, visibleCount)
  const hasMore = visibleCount < filteredCourses.length

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key)
    setVisibleCount(ITEMS_PER_PAGE)
  }, [])

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE)
  }

  return (
    <div className="flex-1 w-full h-full overflow-x-hidden overflow-y-auto bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none @container outline-none">
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl">
        <LearnTabs active={activeFilter} onChange={handleFilterChange} />
      </div>
      
      <div className="w-full pt-1 pb-16 @md:pb-10 max-w-5xl mx-auto px-3 @md:px-6">
        {displayedCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 mb-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center">
              <span className="text-xl">📚</span>
            </div>
            <h3 className="text-sm font-bold text-[#1f1633] mb-0.5">No courses found</h3>
            <p className="text-xs text-gray-500">There are no courses available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 @lg:grid-cols-2 gap-2.5 @md:gap-3">
            {displayedCourses.map((course, index) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                index={index} 
              />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-5 @md:mt-6 mb-4">
            <button 
              onClick={handleLoadMore}
              className="
                group flex items-center justify-center gap-2 px-6 py-2.5 min-w-35 
                text-xs font-bold text-white rounded-md
                bg-linear-to-r from-[#6a5fc1] via-[#8b5cf6] to-[#6a5fc1] bg-size-[200%_auto]
                shadow-[0_4px_12px_rgba(106,95,193,0.25)]
                hover:bg-position-[100%_center] hover:shadow-[0_6px_16px_rgba(106,95,193,0.4)] 
                hover:-translate-y-px hover:scale-[1.02]
                transition-all duration-500 ease-out active:scale-95 
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a5fc1]/70
              "
            >
              Load More 
            </button>
          </div>
        )}
      </div>
    </div>
  )
}