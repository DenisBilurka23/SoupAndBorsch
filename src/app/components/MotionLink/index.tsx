'use client'

import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const MotionCustomLink = motion(forwardRef((props, ref) => <Link ref={ref} {...props} />) as any)

export default MotionCustomLink
